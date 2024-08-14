import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "../lib/uploadthing";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SellRoute() {
    const [json, setJson] = useState(null)
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
            <Card>
                <form action="">
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
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Category
                            </Label>
                            <SelectCategory/>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <Label>
                                Price
                            </Label>
                            <Input placeholder="28€" type="number" name='price' />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Small Summary</Label>
                            <Textarea name='smallDescription' placeholder="Describe your product sorthly right here..." />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            input
                            <Label>Description</Label>
                            <TipTapEditor json={json} setJson={setJson}/>
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <Label>Product Images</Label>
                            <UploadDropzone endpoint='imageUploader'/>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <Label>Product File</Label>
                            <UploadDropzone endpoint='productFileUpload'/>
                        </div>
                    </CardContent>
                    <CardFooter className='mt-5'>
                        <Button>
                            Submit Form
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}