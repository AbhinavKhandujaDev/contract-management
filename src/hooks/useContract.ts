import { Contract } from "@/lib/types";

const useContract = () => {
  const getAll = async () => {
    const res = await fetch("/api/contracts");
    const data = await res.json();
    return data;
  };
  const add = async (data: Omit<Contract, "id">) => {
    const { name, status } = data;
    const res = await fetch("/api/contracts", {
      method: "post",
      body: JSON.stringify({ name, status }),
    });
    const resdata = await res.json();
    return resdata;
  };
  const update = async (id: string, data: Partial<Omit<Contract, "id">>) => {
    const { name, status } = data;
    const res = await fetch(`/api/contracts?id=${id}`, {
      method: "put",
      body: JSON.stringify({ name, status }),
    });
    const resdata = await res.json();
    return resdata;
  };
  const del = async (id: string) => {
    const res = await fetch(`/api/contracts?id=${id}`, { method: "delete" });
    const resdata = await res.json();
    return resdata;
  };
  const listen = async () => {};

  return { getAll, add, update, del, listen };
};

export default useContract;
