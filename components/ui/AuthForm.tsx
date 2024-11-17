'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(20),
  email: z.string().email()
})

export function ProfileForm(){
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>){
    console.log(values)
  }
}

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
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
        <div className='flex flex-col gap-1 md:gap-3'>
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
      ): (
        <>
        FORM
        </>
      )}
    </section>
  )
}

export default AuthForm