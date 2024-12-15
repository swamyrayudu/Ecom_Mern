import React, { Fragment } from "react";
import { filterOptions } from "../config";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

export default function ShoppingFilter() {
  return (
    <div>
      <div className="p-4 bg-background">
        <h2 className="font-extrabold text-[20px]">Filters</h2>
      </div>
      <Separator />
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyoptions) => (
          <Fragment key={keyoptions}>
            <div>
              <h3 className="font-semibold">{keyoptions}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyoptions].map((options) => (
                  <Label
                    key={`${keyoptions}-${options.label}`}
                    className="flex items-center gap-2 font-light"
                  >
                    <Checkbox />
                    {options.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
