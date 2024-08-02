import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  CalendarIcon, ClockIcon } from "lucide-react";

const SampleCard:React.FC<{serial:number}> = (serial) => {
    return ( 
        <Card className="flex-col justify-center items-center relative bg-accent ">
        <CardHeader className="absolute  top-2 right-4 ">
            <CardTitle className="text-yellow-600 border border-primary-foreground p-1 rounded-lg text-base bg-opacity-5 bg-white">PG-13</CardTitle>
        </CardHeader>
        <CardContent className="pt-2 justify-center items-center">
            <div className="bg-cover bg-sample-poster size-100 h-80 w-56  rounded-sm "/>
        </CardContent>
        <CardDescription className="text-center">
            <p className="">SN {serial.serial} Title of the movie/series</p>
        </CardDescription>
        <CardFooter className=" items-center  text-sm justify-center">
            <div className="flex gap-1.5 pt-2">
                <>
                    <CalendarIcon className="w-4 h-4 "/>
                    <p>01-Aug-2024</p>
                </>
                <>
                    <ClockIcon className="w-4 h-4"/>
                    <p>120 min</p>
                </>
            </div>
        </CardFooter>

    </Card>       
     );
}
 
export default SampleCard;