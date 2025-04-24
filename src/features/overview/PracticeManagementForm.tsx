"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { NotificationCard } from "./NotificationCard";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  practiceSystem: z.string().min(1, "Please select your customer management system"),
});

const systems = [
  { value: "dentrix", label: "QuickBooks", disabled: false },
  { value: "dentrix-ascend", label: "ServiceTitan", disabled: true },
  { value: "dental-intelligence", label: "Housecall Pro", disabled: true, },
  { value: "revenue-wall", label: "Jobber", disabled: true },
  { value: "epic", label: "Odoo", disabled: true },
  { value: "mango", label: "Zoho", disabled: true },
  { value: "max-assist", label: "Others", disabled: true },
  { value: "eaglesoft-cloud", label: "JobNimbus", disabled: true },
  { value: "open-dental-cloud", label: "Others", disabled: true },
  { value: "carestack", label: "Custom Integration", disabled: true },
  { value: "tab32", label: "Homestars", disabled: true },
  { value: "dentimax-cloud", label: "Upload Spreadsheet / CSV", disabled: true },
  { value: "curve-dental", label: "Zoho", disabled: true },
  { value: "eaglesoft", label: "Monday", disabled: true },
  { value: "open-dental", label: "Salesforce", disabled: true },
  { value: "orthotrac", label: "Kommo", disabled: true },
  { value: "abeldent", label: "Pipedrive", disabled: true },
  { value: "mogo-cloud", label: "Insightly", disabled: true },
  { value: "axium", label: "Sugar CRM", disabled: true },
  { value: "fuse", label: "Freshworks", disabled: true },
  { value: "macpractice-dds", label: "Salesmate", disabled: true },
];

const userFormSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

type PracticeLoginFormValues = z.infer<typeof userFormSchema>;

export function PracticeSystemForm({
  isConnected,
  onConnect,
}: {
  isConnected: boolean;
  onConnect: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [step, setStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      practiceSystem: "dentrix",
    },
  });

  const userForm = useForm<PracticeLoginFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "demo@getgrunt.co",
      password: "•••••••",
    },
  });

  function onSubmit(values: { practiceSystem: string }) {
    console.log(values);
    // setOpen(false);
    // form.reset();
    setStep(1);
  }
  const [isLoading, setIsLoading] = useState(false);
  function onSubmitUserForm(values: PracticeLoginFormValues) {
    console.log(values);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onConnect();
      setOpen(false);
      form.reset();
    }, 1500);
  }

  const handleConnectClick = () => {
    // if (terminalRef.current) {
    //   setProcessStarted(true);
    //   terminalRef.current.openTerminal();
    setIsShown(false);
    setOpen(true);
    // }
  };

  const [isShown, setIsShown] = useState(true);

  return (
    <>
      {isConnected && (
        <div
          className={cn(
            buttonVariants({
              className:
                "bg-black text-white px-4 py-2 rounded-md text-sm font-normal relative cursor-pointer",
            })
          )}
          onClick={handleConnectClick}
          // disabled={processStarted && progress > 0}
        >
          Begin Process
          <NotificationCard isShown={isShown} setIsShown={setIsShown} />
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Customer Management System</DialogTitle>
            <DialogDescription>
              {step == 0
                ? "Choose the system you want to connect."
                : "Login with your CRM account"}
            </DialogDescription>
          </DialogHeader>

          {step === 0 && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="practiceSystem"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover
                          open={popoverOpen}
                          onOpenChange={setPopoverOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between"
                            >
                              {systems.find((s) => s.value === field.value)
                                ?.label ?? "Select System"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandGroup className="h-56 overflow-auto">
                                {systems.map((system) => (
                                  <CommandItem
                                    key={system.value}
                                    value={system.value}
                                    disabled={system.disabled}
                                  >
                                    {system.label}
                                    {form.watch("practiceSystem") ===
                                      system.value && (
                                      <Check className="ml-auto h-4 w-4" />
                                    )}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </Form>
          )}

          {step == 1 && (
            <Form {...userForm}>
              <form
                onSubmit={userForm.handleSubmit(onSubmitUserForm)}
                className="space-y-4"
              >
                <FormField
                  control={userForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-[#1F2937]">
                        Username*
                      </FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-[#1F2937]">
                        Password*
                      </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-red-500 text-sm italic">
                  Username and password is pre-defined for this demo
                </p>
                <div className="flex justify-between gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    Connect
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PracticeSystemForm;
