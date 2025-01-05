'use client';
import * as z from 'zod';
import Link from 'next/link';
import { useTransition, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { loginAction } from '@/actions/login';
import { PasswordInput } from '@/components/ui/password-input'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { LoginSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import GithubSignInButton from './github-auth-botton';
import { useSearchParams } from 'next/navigation';
import { FormError } from '@/components/forms/messages/FormError';
import { FormSuccess } from '@/components/forms/messages/FormSuccess';



type UserFormValue = z.infer<typeof LoginSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with different provider!' : '';

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    email: '',
    password: '',
 
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(LoginSchema),
    defaultValues
  });

  const onSubmit = async (values: UserFormValue) => {
    setError('');
    setSuccess('');
        startTransition(() => {
        loginAction(values, callbackUrl).then((data) => {
          if (data?.error) {
            form.reset();
            toast.error(`${data?.error}`);
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            toast.success(`Signed In Successfully`);
            setSuccess('Signed In Successfully')
          }
        })
        .catch((error) => {
          if (error?.digest?.includes("NEXT_REDIRECT")) {
            return;
          }
          setError('Something went wrong!');
          toast.error('Something went wrong!');
        })
      });

  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="johndoe@mail.com"
                            type="email"
                            autoComplete="email"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <div className="flex justify-between items-center">
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <PasswordInput
                            id="password"
                            placeholder="******"
                            autoComplete="current-password"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} className="ml-auto w-full" type="submit">
                  { isPending ? "Login..." : "Login" }
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GithubSignInButton />
    </>
  );
}
