import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import { Image } from "cloudinary-react";
import { SearchBox } from "./searchBox";
import {
  CreateHouseMutation,
  CreateHouseMutationVariables,
} from "src/generated/CreateHouseMutation";
import {
  UpdateHouseMutation,
  UpdateHouseMutationVariables,
} from "src/generated/UpdateHouseMutation";
import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";

const SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`;

const CREATE_HOUSE_MUTATION = gql`
  mutation CreateHouseMutation($input: HouseInput!) {
    createHouse(input: $input) {
      id
    }
  }
`;

const UPDATE_HOUSE_MUTATION = gql`
  mutation UpdateHouseMutation($id: String!, $input: HouseInput!) {
    updateHouse(id: $id, input: $input) {
      id
      image
      publicId
      latitude
      longitude
      bedrooms
      address
    }
  }
`;

interface IUploadImageResponse {
  secure_url: string;
}

async function uploadImage(image: File, signature: string, timestamp: number): Promise<IUploadImageResponse> {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? "");

  const response = await fetch(url, {
    method: "post",
    body: formData,
  });
  return response.json();
}

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: string;
  image: FileList;
}

interface IHouse {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  image: string;
  publicId: string;
}

interface IProps {
  house?: IHouse;
}

export default function HouseForm({ house }: IProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const { register, handleSubmit, setValue, formState: {errors}, watch } = useForm<
    IFormData
  >({
    defaultValues: house
      ? {
          address: house.address,
          latitude: house.latitude,
          longitude: house.longitude,
          bedrooms: house.bedrooms.toString(),
        }
      : {},
  });
  const address = watch("address");
  const [createSignature] = useMutation<CreateSignatureMutation>(
    SIGNATURE_MUTATION
  );
  const [createHouse] = useMutation<
    CreateHouseMutation,
    CreateHouseMutationVariables
  >(CREATE_HOUSE_MUTATION);
  const [updateHouse] = useMutation<
    UpdateHouseMutation,
    UpdateHouseMutationVariables
  >(UPDATE_HOUSE_MUTATION);

  useEffect(() => {
    register("address", { required: "Please enter your address" });
    register("latitude", { required: true, min: -90, max: 90 });
    register("longitude", { required: true, min: -180, max: 180 });
    // register({ name: "bedrooms" as const }, { required: true, min: 0, max: 10 });
    // register({ name: "image" as const }, { required: !house });
  }, [register, house]);

  const handleCreate = async (data: IFormData) => {
    const { data: signatureData } = await createSignature();
    if (signatureData) {
      const { signature, timestamp } = signatureData.createImageSignature;
      const imageData = await uploadImage(data.image[0], signature, timestamp);

      const { data: houseData } = await createHouse({
        variables: {
          input: {
            address: data.address,
            image: imageData.secure_url,
            coordinates: {
              latitude: data.latitude,
              longitude: data.longitude,
            },
            bedrooms: parseInt(data.bedrooms, 10),
          },
        },
      });

      if (houseData?.createHouse) {
        router.push(`/houses/${houseData.createHouse.id}`);
      }
    }
  };

  const handleUpdate = async (currentHouse: IHouse, data: IFormData) => {
    let image = currentHouse.image;

    if (data.image[0]) {
      const { data: signatureData } = await createSignature();
      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature;
        const imageData = await uploadImage(
          data.image[0],
          signature,
          timestamp
        );
        image = imageData.secure_url;
      }
    }

    const { data: houseData } = await updateHouse({
      variables: {
        id: currentHouse.id,
        input: {
          address: data.address,
          image: image,
          coordinates: {
            latitude: data.latitude,
            longitude: data.longitude,
          },
          bedrooms: parseInt(data.bedrooms, 10),
        },
      },
    });

    if (houseData?.updateHouse) {
      router.push(`/houses/${currentHouse.id}`);
    }
  };

  const onSubmit = (data: IFormData) => {
    console.log('submitting', data);
    setSubmitting(false);
    if (!!house) {
      handleUpdate(house, data);
    } else {
      handleCreate(data);
    }
  };

  const validateImage = (value) => {
    console.log('value:', value);
    const fileList = value?.[0];
    // const house = ''; // Assuming you have a 'house' variable

    if (!fileList) {
      return 'Please upload an image';
    }

    if (house || fileList) {
      return true;
    }

    return 'Please upload one file';
  };

  /*const validateImage = (fileList) => {
    console.log('value:', fileList);
    if (fileList.length === 1) {
      const file = fileList[0];
      if (file.type.includes('image')) {
        return true;
      } else {
        return 'Please upload an image file';
      }
    } else {
      return 'Please upload one file';
    }
  };*/

  return (
    <form className="mx-auto max-w-xl py-4"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl">
        {house ? `Editing ${house.address}` : "Add a New House"}
      </h1>

      <div className="mt-4">
        <label htmlFor="search" className="block">
          Search for your address
        </label>
        <SearchBox
          onSelectAddress={(address, latitude, longitude) => {
            setValue("address", address);
            setValue("latitude", latitude ?? 0);
            setValue("longitude", longitude ?? 0);
          }}
          defaultValue={house ? house.address : ""}
        />
        {errors?.address && <p>{errors.address.message}</p>}
      </div>

      {address && (
        <>
          <div className="mt-4">
            <label
              htmlFor="image"
              className="p-4 border-dashed border-4 border-gray-600 block cursor-pointer"
            >
              Click to add image (16:9)
            </label>
            {/*<input
                id="image"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                {...register('image', { validate: validateImage })}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const fileList = event.target.files;
                  if (fileList?.length) {
                    const file = fileList[0];
                    const reader = new FileReader();
                    reader.onloadend = () => setPreviewImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
            />*/}
             <input
                 id="image"
                 // name="image"
                 type="file"
                 accept="image/*"
                 style={{ opacity: 0 }}
                 {...register('image',{
                   validate: (fileList: FileList) => {
                     console.log('fileList:', fileList);
                     if (house || fileList.length === 1) return true;
                     return "Please upload one file";
                   },
                 })}
                 onChange={(event: ChangeEvent<HTMLInputElement>) => {
                   if (event?.target?.files?.[0]) {
                     const file = event.target.files[0];
                     const reader = new FileReader();
                     reader.onloadend = () => {
                       setPreviewImage(reader.result as string);
                     };
                     reader.readAsDataURL(file);
                   }
                 }}

             />
            House:{house}
            {previewImage ? (
              <Image
                src={previewImage}
                className="mt-4 object-cover"
                style={{ width: "576px", height: `${(9 / 16) * 576}px` }}
              />
            ) : house ? (
              <>
                house ima
              <Image
                className="mt-4"
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={house.publicId}
                alt={house.address}
                secure
                dpr="auto"
                quality="auto"
                width={576}
                height={Math.floor((9 / 16) * 576)}
                crop="fill"
                gravity="auto"
              />
              </>
            ) : null}
            {errors.image && <p>{errors.image.message}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="bedrooms" className="block">
              Beds
            </label>
            <input
              id="bedrooms"
              type="number"
              className="p-2"
              {...register('bedrooms', {
                required: "Please enter the number of bedrooms",
                max: { value: 10, message: "Wooahh, too big of a house" },
                min: { value: 1, message: "Must have at least 1 bedroom" },
              })}
            />
            {errors.bedrooms && <p>{errors.bedrooms.message}</p>}
          </div>

          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              type="submit"
              disabled={submitting}
            >
              Save
            </button>{" "}
            <Link href={house ? `/houses/${house.id}` : "/"}>
              Cancel
            </Link>
          </div>
        </>
      )}
    </form>
  );
}
