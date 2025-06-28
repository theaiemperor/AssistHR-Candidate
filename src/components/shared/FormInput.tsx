'use client'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {useFormContext} from 'react-hook-form'
import {Textarea} from "@/components/ui/textarea";
import {ComponentProps} from "react";


interface BaseProps {
    name: string
    placeholder?: string
    label?: string
    className?: string
}

interface FormInput {
    multiline?: false
    props?: ComponentProps<'input'>
}


interface FormArea {
    multiline: true
    props?: ComponentProps<'textarea'>
}

type FormInputProps = BaseProps & (FormInput | FormArea);


export default function ({name, placeholder, label, className, multiline, props}: FormInputProps) {
    const {control} = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {
                            multiline ? <Textarea {...field} {...props} placeholder={placeholder}/> :
                                <Input  {...field} {...props} placeholder={placeholder}/>
                        }
                    </FormControl>
                </FormItem>
            )}
        />
    )
}
