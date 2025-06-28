import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useFormContext} from "react-hook-form";


interface Props {
    name: string
    label?: string
    className?: string
    options: { [key: string]: string }
    alignVertical?: boolean
}


export default function (props: Props) {
    const {control} = useFormContext()
    return <>
        <FormField
            control={control}
            name={props.name}
            render={({field}) => (
                <FormItem>
                    <FormLabel className={'mb-2'}>{props.label}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className={props.alignVertical ? '' : 'flex gap-5'}
                        >
                            {
                                Object.keys(props.options).map(option => {
                                    return <FormItem key={option} className="flex items-center gap-2">
                                        <FormControl>
                                            <RadioGroupItem value={option}/>
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {props.options[option]}
                                        </FormLabel>
                                    </FormItem>
                                })
                            }
                            
                        </RadioGroup>
                    </FormControl>

                </FormItem>
            )}
        />
    </>
}
