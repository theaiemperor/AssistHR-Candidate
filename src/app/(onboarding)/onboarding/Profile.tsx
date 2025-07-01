"use client"
import OnboardingContainer from "@/app/(onboarding)/OnboardingContainer"
import {Button} from "@/components/ui/button"
import {FormProvider, useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import FormInput from "@/components/shared/FormInput";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Slider} from "@/components/ui/slider";
import RadioInput from "@/components/shared/RadioInput";


const formSchema = z.object({
    userName: z
        .string({required_error: 'User name is required'})
        .min(2, 'Minimum 2 characters')
        .max(50, 'Maximum 50 characters'),


    phone: z
        .string({required_error: 'Phone number is required'})
        .min(10, 'Invalid phone number')
        .max(15),

    city: z.string().min(2),
    country: z.string().min(2),

    gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
    }),

    experience: z
        .number({required_error: 'Experience is required'})
        .min(0)
        .max(50),

    skills: z.array(z.string()).min(1, 'At least one skill is required'),

    bio: z.string().max(500)

})

export default function ProfileForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            city: "",
            country: "",
            gender: "male" as const,
            bio: "",
            phone: "",
            experience: 5,
            skills: [''],
        },
    })

    function onSubmit(data: any) {
        alert(JSON.stringify(data))
    }

    return (
        <OnboardingContainer title={"Profile"} hideNext>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormInput name={'userName'} label={'Name'}/>
                    <div className={'flex w-full gap-3 items-end'}>
                        <FormInput className={'w-16 font-bold'} name={'countryCode'} label={'Phone'}
                                   props={{defaultValue: "+91"}}/>
                        <FormInput className={'flex-1'} name={'phone'}/>
                    </div>
                    <div className={'flex gap-3 '}>
                        <FormInput className={'flex-1'} name={'city'} label={'City'}/>
                        <FormInput className={'flex-1'} name={'country'} label={'Country'}/>
                    </div>
                    <FormInput name={'bio'} label={'Tell about yourself'} multiline
                               props={{className: "resize-none h-36"}}/>

                    <RadioInput name={'gender'} label={'Gender'}
                                options={{'male': "Male", 'female': "Female", 'other': "Other"}}/>

                    <FormField
                        control={form.control}
                        name={'experience'}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={'mb-2'}>Experience ( {field.value} years )</FormLabel>
                                <FormControl>
                                    <Slider value={[field.value]} onValueChange={(val) => {
                                        field.onChange(val[0])
                                    }} min={0} max={50}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type={'submit'} className={'w-full cursor-pointer'}>
                        Submit
                    </Button>
                </form>
            </FormProvider>
        </OnboardingContainer>
    )
}
