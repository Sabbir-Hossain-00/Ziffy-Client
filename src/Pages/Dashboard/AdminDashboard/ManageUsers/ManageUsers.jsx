import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { Loader } from "../../../Loader/Loader";
import ReactPaginate from "react-paginate";

export const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      const endpoint = searchTerm ? `/users?name=${searchTerm}` : "/users";
      const { data } = await axiosSecure.get(endpoint);
      return data;
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.patch(`/make-admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users", searchTerm]);
      Swal.fire("Success", "User promoted to admin!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Could not make admin.", "error");
    },
  });

  const handleMakeAdmin = (id) => {
    makeAdminMutation.mutate(id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    setSearchTerm(searchInput);
  };

  const pageCount = Math.ceil(users.length / itemsPerPage);
  const displayedUsers = users.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h2>

      <form onSubmit={handleSearch} className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
          type="submit"
          className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Search
        </button>
      </form>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="overflow-x-auto shadow border rounded-lg">
            <table className="min-w-full bg-white text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Membership</th>
                  <th className="px-6 py-3 text-center">Make Admin</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.length > 0 ? (
                  displayedUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 text-gray-700 capitalize">
                        {user.badge === "gold"
                          ? "Gold Member"
                          : "Bronze Member"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {user.role === "admin" ? (
                          <span className="text-green-600 font-semibold">
                            Admin
                          </span>
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user._id)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition"
                          >
                            Make Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-400">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next →"
            previousLabel="← Prev"
            pageCount={pageCount}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            marginPagesDisplayed={pageCount} // Show all pages
            pageRangeDisplayed={pageCount} // Show all pages
            containerClassName="flex flex-wrap justify-center mt-8 gap-2"
            pageClassName="page-item"
            pageLinkClassName="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-amber-100 transition cursor-pointer"
            previousLinkClassName="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-amber-100 transition cursor-pointer"
            nextLinkClassName="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-amber-100 transition cursor-pointer"
            activeLinkClassName="bg-amber-400 text-white border-amber-500  hover:bg-amber-500 cursor-pointer"
            breakLinkClassName="px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer"
            disabledLinkClassName="opacity-50 cursor-not-allowed"
          />
        </>
      )}
    </div>
  );
};
