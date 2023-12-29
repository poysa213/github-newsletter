"use client";
import React, { ChangeEvent, useState } from "react";
import { api } from "~/trpc/react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("DAILY");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const addSubscriber = api.newsletter.addSubscriber.useMutation({
    onSuccess: () => {
      setEmail("");
      setIsSuccess(true);
      setType("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addSubscriber.mutate({ email, type });
      }}
      className="text-xl"
    >
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-52 my-2 rounded-md border border-white bg-transparent px-2 py-2  text-base font-bold placeholder:text-sm placeholder:text-yellow-300 placeholder:text-opacity-90 focus:outline-none"
        placeholder="email@domain.x"
        type="email"
        required
      />
      <div className="flex flex-col items-start">
        <label>
          <input
            type="radio"
            value="DAILY"
            className="m-2"
            checked={type === "DAILY"}
            onChange={handleOptionChange}
          />
          Daily
        </label>

        <label>
          <input
            type="radio"
            value="WEEKLY"
            className="m-2"
            checked={type === "WEEKLY"}
            onChange={handleOptionChange}
          />
          Weekly
        </label>

        <label>
          <input
            type="radio"
            value="MONTHLY"
            className="m-2"
            checked={type === "MONTHLY"}
            onChange={handleOptionChange}
          />
          Monthly
        </label>
      </div>

      <button
        disabled={addSubscriber.isSuccess || addSubscriber.isLoading}
        type="submit"
        className={
          addSubscriber.isLoading
            ? "h-10 w-52 my-2 rounded-md border-2 border-yellow-300 bg-yellow-300 py-1 pr-2 hover:border-yellow-300 hover:bg-violet-500"
            : "h-10 w-52 my-2 rounded-md border-2 border-yellow-300 bg-yellow-300 py-1 pr-2 hover:border-yellow-300 hover:bg-violet-500"
        }
      >
        {addSubscriber.isLoading
          ? "Subscribing..."
          : isSuccess
          ? "Subscribed!"
          : addSubscriber.isError?
            "Error!"
          : "Subscribe"}
      </button>
    </form>
  );
}
