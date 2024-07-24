import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterType } from "@/schemas/user.schema";
import Image from "next/image";
import { ElementRef, useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export const RegisterAvatarInput = ({ form }: { form: UseFormReturn<RegisterType> }) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [source, setSource] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    form.setValue("avatar", file);

    closeRef.current?.click();

    if (file) {
      setSource(window.URL.createObjectURL(file));
    } else {
      setSource("/placeholder.jpg");
    }
  };

  useEffect(() => {
    setSource("/placeholder.jpg");
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="w-[150px] space-y-2">
        <div className="overflow-hidden rounded-full border-4">
          <Image
            src={source}
            alt="Profile Picture"
            height={150}
            width={150}
            className="aspect-square cursor-pointer object-cover"
            sizes="150px"
          />
        </div>
        {form.formState.errors.avatar?.message && (
          <span className="inline-block text-balance text-destructive">{form.formState.errors.avatar?.message}</span>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Profile</DialogTitle>
          <DialogDescription>Please select or upload your Image.</DialogDescription>
        </DialogHeader>

        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { value, onChange, ...field }, formState: { isSubmitting } }) => (
            <FormItem className="mx-auto w-fit overflow-hidden rounded-full border-4">
              <FormLabel>
                <Image
                  src={source}
                  alt="Profile Picture"
                  height={150}
                  width={150}
                  className="aspect-square cursor-pointer object-cover"
                  sizes="150px"
                />
              </FormLabel>

              <FormControl>
                <Input accept="image/*" type="file" className="hidden" disabled={isSubmitting} onChange={handleChange} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogDescription>Notice! the maximum photo file size is 1mb.</DialogDescription>
          <DialogClose ref={closeRef} className="hidden" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
