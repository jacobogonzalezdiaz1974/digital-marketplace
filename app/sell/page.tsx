'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "../lib/uploadthing";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";
import { SellProduct, State } from "../actions";
import { toast } from "sonner";



export default function SellRoute() {
    const initialState: State ={message:'', status: undefined}
    const [state, formAction] = useFormState(SellProduct, initialState)
    const [json, setJson] = useState<null | JSONContent>(null)
    const [images, setImages] = useState<null | string[]>(null)
    const [productFile, SetProductFile] = useState<null | string>(null)

    useEffect(()=>{
        if(state.status === 'success'){
            toast.success(state.message)
        }else if(state.status === 'error'){
            toast.error(state.message)
        }
    },[state])

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
            <Card>
                <form action={formAction}>
                    <CardHeader>
                        <CardTitle>
                            Sell your product with ease
                        </CardTitle>
                        <CardDescription>
                            Please describe your product here in detail so that it can be sold
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Name
                            </Label>
                            <Input name='name' type="text" placeholder='Name of your product' />
                            {state?.errors?.['name']?.[0] && (
                                <p className='text-destructive'>{state?.errors?.['name']?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Category
                            </Label>
                            <SelectCategory />
                            {state?.errors?.['category']?.[0] && (
                                <p className='text-destructive'>{state?.errors?.['category']?.[0]}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <Label>
                                Price
                            </Label>
                            <Input placeholder="28€" type="number" name='price' />
                            {state?.errors?.['price']?.[0] && (
                                <p className='text-destructive'>{state?.errors?.['price']?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Small Summary</Label>
                            <Textarea name='smallDescription' placeholder="Describe your product sorthly right here..." />
                             {state?.errors?.['smallDescription']?.[0] && (
                                <p className='text-destructive'>{state?.errors?.['smallDescription']?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name='description' value={JSON.stringify(json)}/>
                            <Label>Description</Label>
                            <TipTapEditor json={json} setJson={setJson}/>
                            {state?.errors?.['description']?.[0] && (
                                <p className='text-destructive'>{state?.errors?.['description']?.[0]}</p>
                            )}

                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <input type="hidden" name='images' value={JSON.stringify(images)}/>
                            <Label>Product Images</Label>
                            <UploadDropzone endpoint='imageUploader' onClientUploadComplete={(res) => {
                                setImages(res.map((item) =>item.url));
                                toast.success("your images have been uploaded");
                            }}
                                onUploadError={(error: Error) => {
                                    toast.error("Something went wrong");
                                }}
                            />
                            {state?.errors?.['images']?.[0] && (
                                <p className='text-destructive'>{state?.errors?.['images']?.[0]}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <input type='hidden' name='productFile' value={productFile ?? ''}/>
                            <Label>Product File</Label>
                            <UploadDropzone onClientUploadComplete={(res)=>{
                                SetProductFile(res[0].url)
                                toast.success("Your product file has been uploaded");
                            }} 
                            endpoint='productFileUpload'
                            onUploadError={(error:Error)=>{
                                toast.success("Something went wrong");
                            }}
                            />
                            {state?.errors?.['productFile']?.[0] && (
                                <p className='text-destructive'>{state?.errors?.['productFile']?.[0]}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className='mt-5'>
                        <Button type='submit'>
                            Submit Form
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}