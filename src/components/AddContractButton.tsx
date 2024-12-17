"use client";

import { Button, ButtonLoading } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Contract } from "../lib/types";
import { OptionSelect } from "./ui/select";
import statuses from "@/components/table/statuses.json";
import { FormEvent, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import useContract from "@/hooks/useContract";

const DIALOG_ID = "contract-close";

const defStatus = statuses[0].id;

export function AddContractButton(props: { isAdd?: boolean; data?: Contract }) {
  const { toast } = useToast();
  const { isAdd, data } = props;
  const { name = "", status = defStatus } = data || {};

  const { add, update } = useContract();

  const formRef = useRef({ name, status });

  // const onSubmit = onCreateContract.bind(null);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!e.target) return;
    e.preventDefault();
    const { name, status } = formRef.current;
    add({ name, status })
      .then(() => {
        document.getElementById(DIALOG_ID)?.click();
        toast({ title: "Contract successfully created" });
      })
      .catch(() =>
        toast({ variant: "destructive", title: "Contract creation failed" })
      );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute right-10 bottom-10">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isAdd ? "Add" : "Edit"}Contract</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-5 py-4">
          <div className="items-center gap-2 flex flex-col">
            <label className="text-start w-full">Name</label>
            <Input
              name="name"
              placeholder="Enter name"
              required
              onChange={(e) => {
                formRef.current.name = e.target.value;
              }}
            />
          </div>
          <div className="items-center gap-2 flex flex-col">
            <label className="text-start w-full">Status</label>
            <OptionSelect
              name="status"
              required
              selected={defStatus}
              placeholder="Select status"
              opts={statuses}
              onValueChange={(value) => {
                formRef.current.status = value;
              }}
            />
          </div>
          <DialogFooter>
            <ButtonLoading type="submit">Save</ButtonLoading>
            <DialogClose id={DIALOG_ID} asChild>
              <Button id={DIALOG_ID} type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
