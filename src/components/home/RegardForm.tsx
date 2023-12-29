import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DateTimePicker } from '../styled/DatetimePicker';

const formSchema = z.object({
  from: z.string({ required_error: 'Debes ingresar un correo remitente' }).email({
    message: 'Debes ingresar un email válido',
  }),
  to: z.string({ required_error: 'Debes ingresar un correo receptor' }).email({
    message: 'Debes ingresar un email válido',
  }),
  subject: z
    .string({
      required_error: 'Debes ingresar un correo receptor',
    })
    .min(3, { message: 'El asunto debe contener al menos 3 letras' }),
  date: z
    .date({
      required_error: 'Debes ingresar una fecha.',
    })
    .min(new Date(), { message: 'La fecha debe ser futura.' }),
});

type FormSchema = z.infer<typeof formSchema>;

const RegardForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: '',
      to: '',
      subject: '',
    },
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tu correo</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Este es el correo desde el cual se enviará el mensaje.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Su correo</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Este es el correo al que se le enviará el mensaje.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asunto</FormLabel>
              <FormControl>
                <Input placeholder="Asunto" {...field} />
              </FormControl>
              <FormDescription>Este es el tema sobre el cuál se generará el mensaje.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <DateTimePicker date={field.value} setDate={field.onChange} />
              </FormControl>
              <FormDescription>Esta es la fecha para enviar el mensaje</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Confirmar</Button>
      </form>
    </Form>
  );
};

export default RegardForm;
