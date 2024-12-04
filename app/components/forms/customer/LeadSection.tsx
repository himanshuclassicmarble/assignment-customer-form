'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema, ExecutiveOptions, TeamLeadOptions, executiveOptions } from '@/app/types/form';
import { Label } from '@/components/ui/label';
interface LeadSectionProps {
  form: UseFormReturn<FormSchema>;
}

export function LeadSection({ form }: LeadSectionProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm font-mono text-foreground">Lead Generator</Label>
        <Select 
          onValueChange={(value: ExecutiveOptions) => setValue('leadGenerator', value)}
          value={watch('leadGenerator')}
        >
          <SelectTrigger className={`${errors.leadGenerator ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}>
            <SelectValue placeholder="Select lead generator" />
          </SelectTrigger>
          <SelectContent>
            {executiveOptions.map((option) => (
              <SelectItem key={option} value={option} className="text-foreground">{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.leadGenerator && (
          <div className="text-destructive text-xs">{errors.leadGenerator.message}</div>
        )}
      </div>

      <div className="flex lg:flex-row md:flex-row max-sm:flex-col justify-between gap-3">
        <div className="space-y-2 flex-grow">
          <Label className="text-sm font-mono text-foreground">Team Lead</Label>
          <Select 
            onValueChange={(value: TeamLeadOptions) => setValue('teamLead', value)}
            value={watch('teamLead')}
          >
            <SelectTrigger className={`${errors.teamLead ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}>
              <SelectValue placeholder="Select team lead" />
            </SelectTrigger>
            <SelectContent>
              {executiveOptions.map((option) => (
                <SelectItem key={option} value={option} className="text-foreground">{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.teamLead && (
            <div className="text-destructive text-xs">{errors.teamLead.message}</div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-mono text-foreground">CRM ID</Label>
          <Input 
            {...register('customerCRMID')}
            placeholder='eg. 123456'
            className={`${errors.customerCRMID ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}
          />
          {errors.customerCRMID && (
            <div className="text-destructive text-xs">{errors.customerCRMID.message}</div>
          )}
        </div>
      </div>
    </>
  );
}