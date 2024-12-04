'use client';

import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '@/app/types/form';
import { Label } from '@/components/ui/label';
interface ProjectSectionProps {
  form: UseFormReturn<FormSchema>;
}

export function ProjectSection({ form }: ProjectSectionProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="flex lg:flex-row md:flex-row max-sm:flex-col justify-between gap-3">
      <div className="space-y-2 flex-1">
        <Label className="text-sm font-mono text-foreground">Project</Label>
        <Input 
          {...register('customerProject')}
          placeholder='eg. ABC Project'
          className={`${errors.customerProject ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}
        />
        {errors.customerProject && (
          <div className="text-destructive text-xs">{errors.customerProject.message}</div>
        )}
      </div>

      <div className="space-y-2 flex-1">
        <Label className="text-sm font-mono text-foreground">Architect</Label>
        <Input 
          {...register('customerArchitect')}
          placeholder='eg. ABC Architect'
          className={`${errors.customerArchitect ? "ring-2 ring-destructive" : ""} bg-background text-foreground`}
        />
        {errors.customerArchitect && (
          <div className="text-destructive text-xs">{errors.customerArchitect.message}</div>
        )}
      </div>
    </div>
  );
}