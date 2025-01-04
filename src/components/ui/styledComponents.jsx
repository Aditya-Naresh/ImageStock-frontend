import React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

export const Header = ({ children }) => (
  <header className="bg-gray-300 auto sm:h-20">{children}</header>
);

export const ToolbarStyled = ({ children }) => (
  <div className="flex flex-col items-center py-4 sm:flex-row sm:py-8">{children}</div>
);

export const StockImageCard = ({ children }) => (
  <Card className="bg-black p-4 text-white flex items-center rounded cursor-pointer mb-4 sm:ml-10 sm:mb-0">
    <CardHeader>
      <h3 className="text-lg font-semibold">Stock Image</h3>
    </CardHeader>
    <CardContent>{children}</CardContent>
    <CardFooter>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">View More</button>
    </CardFooter>
  </Card>
);

export const LogoutCard = ({ children }) => (
  <Card className="bg-black p-4 text-white flex items-center rounded cursor-pointer">
    <CardHeader>
      <h3 className="text-lg font-semibold">Logout</h3>
    </CardHeader>
    <CardContent>{children}</CardContent>
    <CardFooter>
      <button className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
    </CardFooter>
  </Card>
);
