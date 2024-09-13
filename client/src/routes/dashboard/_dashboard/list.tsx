import { EditUser } from "@/components/shared/EditUser";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axios } from "@/lib/axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/_dashboard/list")({
  component: () => <List />,
});

function List() {
  const search = Route.useSearch();

  let _search: any = search;

  const navigate = useNavigate();

  const [rowData] = useState([
    {
      field: "SI.No",
      width: 100,
    },
    {
      field: "Username",
    },

    {
      field: "Company Name",
    },
    {
      field: "Category",
    },
    {
      field: "Email",
    },
    {
      field: "Actions",
    },
  ]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["employees", pagination.page, pagination.limit],
    queryFn: () => {
      return axios.get(
        `/members/all?limit=${pagination.limit}&page=${pagination.page}`
      );
    },
  });

  const { mutate: deleteEmployee } = useMutation({
    mutationFn: (id) => axios.delete(`/members/deletemember?slug=${id}`),
    onSuccess: () => {
      toast.success("Employee deleted successfully");
      refetch();
    },
  });

  useEffect(() => {
    if (data) {
      setPagination((prev) => ({
        ...prev,
        total: data.data.total,
      }));
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  const totalPages = useMemo(
    () => Math.ceil(pagination.total / pagination.limit),
    [pagination.total, pagination.limit]
  );

  return (
    <main className="flex  flex-col gap-4 p-4 lg:gap-6 lg:p-2 text-gray-300 text-lg overflow-y-hidden">
      <div className="flex sticky top-0">
        <div className="flex items-center mx-8">
          <h1 className="text-lg font-semibold md:text-2xl">All Members</h1>
        </div>
      </div>

      {_search["edit"] ? (
        <EditUser />
      ) : (
        <section className="mx-8">
          <Table className="">
            <TableHeader
              style={{
                position: "sticky",
                top: "0px",
                zIndex: 1,
              }}
              className="rounded-xl"
            >
              <TableRow className="bg-contrast text-white hover:bg-contrast rounded-xl">
                {rowData.map((data) => (
                  <TableHead key={data.field}>{data.field}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {isLoading ||
                (isRefetching && (
                  <>
                    {Array.from({ length: 7 }).map((_, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell colSpan={1}>
                            <Skeleton className="h-[30px] rounded-full"></Skeleton>
                          </TableCell>
                          <TableCell colSpan={3}>
                            <Skeleton className="h-[30px] rounded-full"></Skeleton>
                          </TableCell>
                          <TableCell colSpan={1}>
                            <Skeleton className="h-[30px] rounded-full"></Skeleton>
                          </TableCell>
                          <TableCell colSpan={3}>
                            <Skeleton className="h-[30px] rounded-full"></Skeleton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                ))}

              {!isLoading &&
                !isRefetching &&
                data?.data?.employees?.map((employee: any, i: number) => (
                  <TableRow key={employee._id} className="">
                    <TableCell className="">
                      {i + (pagination.page - 1) * pagination.limit + 1}
                    </TableCell>
                    <TableCell
                      className="cursor-pointer hover:underline"
                      onClick={() => {}}
                    >
                      {employee.username}
                    </TableCell>
                    <TableCell className="">{employee?.companyName}</TableCell>
                    <TableCell className="">{employee?.position}</TableCell>
                    <TableCell className="">{employee?.email}</TableCell>
                    <TableCell className="">{employee?.mobileNumber}</TableCell>
                    <TableCell className="">
                      <div className="h-4 w-4 bg-green rounded-full"></div>
                    </TableCell>
                    <TableCell className="flex gap-6 items-center">
                      <Icon
                        scale={4}
                        icon="clarity:pencil-solid"
                        className="text-white cursor-pointer"
                        onClick={() => {
                          navigate({
                            to: "/dashboard/list?edit=" + employee.slug,
                          });
                        }}
                      />
                      <Icon
                        icon={"solar:trash-bin-trash-linear"}
                        onClick={() => {
                          deleteEmployee(employee.slug);
                        }}
                        scale={2}
                        className="text-red-600 dark:text-red-500 cursor-pointer"
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {data?.data?.employees?.length > 0 && (
            <div className="flex  justify-between">
              <Pagination className="mt-4 justify-start">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => {
                        if (pagination.page === 1) return;
                        handlePageChange(pagination.page - 1);
                      }}
                      className={`${
                        pagination.page === 1
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer opacity-100"
                      }`}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={i + 1 === pagination.page}
                        onClick={() => handlePageChange(i + 1)}
                        className="text-white"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => {
                        if (pagination.page === totalPages) return;
                        handlePageChange(pagination.page + 1);
                      }}
                      className={`${
                        pagination.page === totalPages
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer opacity-100"
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
