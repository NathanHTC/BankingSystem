'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from './button'
import CustomInput from '../CustomInput'
import { Loader2 } from 'lucide-react'


//using zod to define the shape of form, defined in one place
export const authFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(50),

  password: z.string().min(2).max(20),
  email: z.string().email()
})

export type AuthFormSchemaType = z.infer<typeof authFormSchema>

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  // useForm from react-hook-form to create a form obj
  const form = useForm<AuthFormSchemaType>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: "",
      email: ""
    },
  })

  // values contains all type-safe and validated fields
  function onSubmit(values: z.infer<typeof authFormSchema>) {
    setIsLoading(true)
    console.log(values)
    setIsLoading(false)
  }
  return (
    <section className="auth-form">
      <header className="flex flex-col ">
        <Link
          href="/"
          className="mb-12 flex pl-4 pt-2
            cursor-pointer items-center gap-2"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="horizon logo"
            className="size-[24px]
                         max-xl:size-14"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold 
          text-black-1">
            Horizon
          </h1>
        </Link>
        <div className='flex flex-col gap-1 '>
          <h1 className="text-24 lg-text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type == 'sign-in' ?
              'Sign In' : 'Sign Up'
            }
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? 'Link your account to get started'
              : 'Please enter your details'
            }
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/* Plaid Link */}
        </div>
      ) : (
        <>
          {/* spread all prop and methods from form to Form as props
        props like register, control, handleSubmit */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <CustomInput
                name="username"
                control={form.control}
                placeholder="Enter your username"
                label='Username'
              />

              <CustomInput
                name="password"
                control={form.control}
                placeholder="Enter your password"
                label='Password'
              />

              <CustomInput
                name="email"
                control={form.control}
                placeholder="Enter your email"
                label='Email'
              />

              <Button type="submit" className="form-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>
          </Form>
        </>
      )}
    </section>
  )
}

export default AuthForm
