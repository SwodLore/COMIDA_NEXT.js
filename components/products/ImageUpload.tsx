"use client"
import { getImagePath } from "@/src/utils"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"
export default function ImageUpload({image} : {image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState("")

  return (
    <CldUploadWidget 
    uploadPreset= "ComidaNext" 
    options={{maxFiles: 1}}
    onSuccess={(result, {widget}) => {
        if (result.event === "success") {
            widget.close()
            // @ts-expect-error Cloudinary response type is not inferred correctly
            setImageUrl(result.info?.secure_url)
        }
    }}
    >
        {({open}) => (
            <>
                <div className="space-y-2">
                    <label className="text-slate-800">Imagen del producto</label>
                    <div className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col items-center justify-center rounded-md gap-4 text-neutral-600 bg-slate-100"
                        onClick={() => open()}
                    >
                        <TbPhotoPlus size={50} />
                        <p className="text-lg font-semibold">Sube una imagen</p>
                        {imageUrl && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image fill style={{ objectFit: "contain" }} src={imageUrl} alt="Producto" />
                            </div>
                        )}
                    </div>
                </div>
                {image && !imageUrl && (
                    <div className="space-y-2">
                        <label htmlFor="">Imagen Actual</label>
                        <div className="relative w-64 h-64">
                            <Image fill src={getImagePath(image)} alt="Producto" />
                        </div>
                    </div>
                )}
                <input type="hidden" name="imageUrl" defaultValue={imageUrl ? imageUrl : image} />
            </>
        )}
    </CldUploadWidget>
  )
}
