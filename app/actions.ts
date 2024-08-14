'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { z } from 'zod';

const productSchema = z.object({
    name: z.string().min(3, { message: "The name has to be a min character length of 5" }),
    category: z.string().min(1, { message: "Category is required" }),
    price: z.number().min(1, { message: "Price is required" }),
    smallDescription: z.string().min(10, { message: "Small description has to be a min" }),
    description: z.string().min(1, { message: "Description has to be a min character" }),
    images: z.array(z.string(), { message: "At least one image" }),
    productFile: z.string().min(1, { message: 'Please upload a zip of your product' })
})

export async function SellProduct(formData: FormData) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        throw new Error("Somethin went wrong");
    }

    const validateFields = productSchema.safeParse({
        name: formData.get('name'),
        category: formData.get("category"),
        price: formData.get("price"),
        smallDescription: formData.get("smallDescription"),
        description: formData.get("description"),
    })
}