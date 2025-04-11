import GoogleButton from "../../components/ui/googleButton";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { Input } from "../../components/ui/input";
import FormLayout from "../../components/layouts/FormLayout";
import { Link } from "react-router-dom";

const FormSchema = z.object({
    email: z.string()
        .email("Email inválido.")
        .min(4, "Campo obrigatório.")
        .max(50, "Máximo de 50 caracteres."),
    password: z.string()
        .min(1, "Campo obrigatório.")
        .min(6, "Senha deve ter no mínimo 6 caracteres.")
})

export function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast(`Entrada com Sucesso!`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input className="h-10" type="email" placeholder="example@mail.com" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-700" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input className="h-10" type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-700" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-white text-black w-full" size={"lg"}>Entrar</Button>
            </form>
        </Form>
    )
}

export const FormTitle = ({text}: {text: string}) => {
    return (
        <h1 className="w-2/3 text-3xl font-bold text-center text-white">{text}</h1>
    )
}

export const FormDescription = ({text}: {text: string}) => {
    return (
        <p className="w-2/3 text-center text-sm text-gray-500">{text}</p>
    )
}

export const FormLink = ({text, link}: {text: string, link: string}) => {
    return (
        <p className="text-sm text-gray-500">{text} <Link to={link} className="text-blue-100 hover:underline">Criar uma</Link></p>
    )
}

export default function SignIn() {
    return (
        <FormLayout>
            <FormTitle text="Inicie a Sessão"></FormTitle>
            <FormDescription text="Entre com sua conta"></FormDescription>
            <InputForm></InputForm>
            <GoogleButton></GoogleButton>
            <FormLink text="Não tem uma conta?" link="/signup"></FormLink>
        </FormLayout>
    )
}
