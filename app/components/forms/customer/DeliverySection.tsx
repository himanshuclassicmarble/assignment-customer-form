'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema, PaymentStatusOptions } from '@/app/types/form';
import { Label } from '@/components/ui/label';
interface DeliverySectionProps {
  form: UseFormReturn<FormSchema>;
}

export function DeliverySection({ form }: DeliverySectionProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <div className="flex flex-col gap-4">
    <div className="flex lg:flex-row md:flex-row max-sm:flex-col justify-between gap-3">
      <div className="space-y-2 flex-1">
        <Label className="text-sm font-mono text-foreground">Delivery Date</Label>
        <Input 
          {...register('deliveryDate')}
          type="date"
          className={`${errors.deliveryDate ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}
        />
        {errors.deliveryDate && (
          <div className="text-destructive text-xs">{errors.deliveryDate.message}</div>
        )}
      </div>

      <div className="space-y-2 flex-1">
        <Label className="text-sm font-mono text-foreground">Payment Status</Label>
        <Select 
          onValueChange={(value: PaymentStatusOptions) => setValue('paymentStatus', value)}
          value={watch('paymentStatus')}
        >
          <SelectTrigger className={`${errors.paymentStatus ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}>
            <SelectValue placeholder="Select payment status" />
          </SelectTrigger>
          <SelectContent>
            {['WIP', 'Paid', 'Pending'].map((status) => (
              <SelectItem key={status} value={status} className="text-foreground">{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.paymentStatus && (
          <div className="text-destructive text-xs">{errors.paymentStatus.message}</div>
        )}
      </div>
     
    </div>
    <div className="space-y-2 flex-grow">
        <Label className="text-sm font-mono text-foreground">Remark</Label>
        <Input 
          {...register('remark')}
          className={`${errors.remark ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}
        />
        {errors.remark && (
          <div className="text-destructive text-xs">{errors.remark.message}</div>
        )}
      </div>
      </div>
  );
}