import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-16 w-16 rounded-md" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-8" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-8 w-12 ml-auto rounded-md" />
      </TableCell>
    </TableRow>
  );
}
