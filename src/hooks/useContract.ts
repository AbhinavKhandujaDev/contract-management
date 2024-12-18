import { Contract } from "@/lib/types";
import { useEffect } from "react";

const sessionId = `${Math.random() * 10000}`;

const socketUrl = new URL(`ws://localhost:8080`);
socketUrl.searchParams.set("sessionId", String(parseInt(sessionId)));
const socket = new WebSocket(socketUrl);

function sendMessage(message: any) {
  // socket?.send(JSON.stringify(message));
}

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
    sendMessage({ data: resdata.data, type: "add" });
    return resdata;
  };

  const update = async (id: string, data: Partial<Omit<Contract, "id">>) => {
    const { name, status } = data;
    const res = await fetch(`/api/contracts?id=${id}`, {
      method: "put",
      body: JSON.stringify({ name, status }),
    });
    const resdata = await res.json();
    sendMessage({ data: resdata.data, type: "upd" });
    return resdata;
  };

  const del = async (id: string) => {
    const res = await fetch(`/api/contracts?id=${id}`, { method: "delete" });
    const resdata = await res.json();
    sendMessage({ data: resdata.data, type: "del" });
    return resdata;
  };

  // useEffect(() => {
  //   return () => socket?.close();
  // }, []);

  return { getAll, add, update, del, socket };
};

export default useContract;
