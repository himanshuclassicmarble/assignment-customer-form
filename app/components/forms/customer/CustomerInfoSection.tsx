'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StateOptions } from '@/app/types/form';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '@/app/types/form';
import { Label } from '@/components/ui/label';
interface CustomerInfoSectionProps {
  form: UseFormReturn<FormSchema>;
}

export function CustomerInfoSection({ form }: CustomerInfoSectionProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-mono text-foreground">Customer Name</Label>
        <Input 
          {...register('customerName')} 
          placeholder='eg. XYZ'
          className={`${errors.customerName ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}
        />
        {errors.customerName && (
          <div className="text-destructive text-xs">{errors.customerName.message}</div>
        )}
      </div>

      <div className="flex lg:flex-row md:flex-row max-sm:flex-col justify-between gap-3">
        <div className="space-y-2 flex-1">
          <Label className="text-sm font-mono text-foreground">Mobile Number</Label>
          <Input 
            {...register('customerMobile')} 
            type="tel"
            placeholder='eg. 7437473847'
            className={`${errors.customerMobile ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}
          />
          {errors.customerMobile && (
            <div className="text-destructive text-xs">{errors.customerMobile.message}</div>
          )}
        </div>

        <div className="space-y-2 flex-1">
          <Label className="text-sm font-mono text-foreground">City</Label>
          <Input 
            {...register('customerCity')}
            placeholder="eg. Mumbai"
            className={`${errors.customerCity ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}
          />
          {errors.customerCity && (
            <div className="text-destructive text-xs">{errors.customerCity.message}</div>
          )}
        </div>

        <div className="space-y-2 flex-1">
          <Label className="text-sm font-mono text-foreground">State</Label>
          <Select 
            onValueChange={(value: string) => {
              if (['Maharashtra', 'Dadra Nagar and Haveli', 'Punjab'].includes(value)) {
                setValue('customerState', value as StateOptions);
              } else {
                setValue('customerState', undefined);
              }
            }}
            value={watch('customerState')}
          >
            <SelectTrigger className={`${errors.customerState ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {['Maharashtra', 'Dadra Nagar and Haveli', 'Punjab'].map((state) => (
                <SelectItem key={state} value={state} className="text-foreground">{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.customerState && (
            <div className="text-destructive text-xs">{errors.customerState.message}</div>
          )}
        </div>
      </div>
    </div>
  );
}