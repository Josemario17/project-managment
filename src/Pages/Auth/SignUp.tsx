
import FormLayout from '../../components/layouts/FormLayout'
import { FormDescription, FormLink, FormTitle } from './SignIn'
import GoogleButton from '../../components/ui/googleButton'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'


const FormSchema = z.object({
    name: z.string()
        .min(1, "Campo obrigatório.")
        .min(3, "Nome deve ter no mínimo 3 caracteres.")
        .regex(/^(?!\s*$).+/, "Campo obrigatório.")
        .max(50, "Máximo de 50 caracteres."),
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
            name: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("Entrada com Sucesso!")
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input className="h-10" type="text" placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-700" />
                        </FormItem>
                    )}
                />
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

export default function SignUp() {
    return (
        <FormLayout>
            <FormTitle text='Criar uma Conta'></FormTitle>
            <FormDescription text='Começe com uma nova conta'></FormDescription>
            <InputForm></InputForm>
            <GoogleButton></GoogleButton>
            <FormLink text='Já tem uma conta?' link='/' ></FormLink>
        </FormLayout>
    )
}
