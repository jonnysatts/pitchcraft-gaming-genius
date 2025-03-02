import React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

import Button from "@/components/ui/button"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Button onClick={() => console.log("Button clicked!")}>Click Me</Button>
      <X className="icon" />
    </div>
  )
}

export default Sidebar;
