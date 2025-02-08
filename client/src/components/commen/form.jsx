import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";


export default function CommonForm({
  formcontrols,
  formdata,
  setformdata,
  onSubmit,
  buttonText,
  isdiseble
}) {
  function renderinputs(getcontrolItems) {
    let element = null;
    const value = formdata[getcontrolItems.name] || "";
    switch (getcontrolItems.componentType) {
      case "input":
        element = (
          <Input
            name={getcontrolItems.name}
            placeholder={getcontrolItems.placeholder}
            id={getcontrolItems.name}
            type={getcontrolItems.type}
            value={value}
            // required
            onChange={(event) =>
              setformdata({
                ...formdata,
                [getcontrolItems.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) => {
              setformdata({
                ...formdata,
                [getcontrolItems.name]: value,
              });
            }}
            value={value}
          >
           <SelectTrigger className="w-full">
              <SelectValue placeholder={getcontrolItems.label} />
            </SelectTrigger>
            <SelectContent >
              {getcontrolItems.options && getcontrolItems.options.length > 0
                ? getcontrolItems.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getcontrolItems.name}
            placeholder={getcontrolItems.placeholder}
            id={getcontrolItems.id}
            value={value}
            onChange={(event) =>
              setformdata({
                ...formdata,
                [getcontrolItems.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getcontrolItems.name}
            placeholder={getcontrolItems.placeholder}
            id={getcontrolItems.name}
            type={getcontrolItems.type}
            value={value}
            onChange={(event) =>
              setformdata({
                ...formdata,
                [getcontrolItems.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div  className="flex flex-col gap-3">
        {formcontrols.map((controlItems) => (
          <div className="grid w-full gap-2" key={controlItems.name}>
            <Label className="mb-1">{controlItems.lable}</Label>
            {renderinputs(controlItems)}
          </div>
        ))}
      </div>
    

      <Button
        type="submit"
        className="mt-3 w-full"
        disabled={isdiseble}
        
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}
