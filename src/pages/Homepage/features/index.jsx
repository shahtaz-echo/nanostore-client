import React from "react";
import { features } from "./common";

const Features = () => {
  return (
    <div className="container py-20">
      <div className="grid grid-cols-4 gap-10">
        {features?.map(({ icon: Icon, title, body }, i) => (
          <div key={i}>
            <Icon className="text-4xl"/>
            <h2 className="text-lg font-semibold my-3">{title}</h2>
            <p className="text-sm">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
