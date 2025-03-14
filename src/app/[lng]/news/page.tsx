"use client";
import { getPosts, searchPosts } from "@/app/ghost/posts";
import Card from "@/components/ui/card";
import ImageWithTextOverlay from "@/components/ui/image-overlay";
import useLoading from "@/hooks/useLoading";
import Image from "next/image";
import React, { useEffect } from "react";
import { Post } from "@/types/featured-posts";
import adaptToPost from "@/helpers/adapt-to-post";

const POSTS_PER_PAGE = 6; // Number of posts to display per page

const News = () => {
  const [allNews, setAllNews] = React.useState<Post[]>([]);
  const [filteredNews, setFilteredNews] = React.useState<Post[]>([]);
  const [displayedNews, setDisplayedNews] = React.useState<Post[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const { startLoading, stopLoading, renderLoading } = useLoading();

  useEffect(() => {
    startLoading();
    getPosts()
      .then((data) => {
        if (data) {
          const posts = data.map(adaptToPost);
          setAllNews(posts);
          setFilteredNews(posts);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        stopLoading();
      });
  }, []);

  // Filter posts client-side when search term changes
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredNews(allNews);
    } else {
      const searchLower = search.toLowerCase();
      const filtered = allNews.filter((post) => {
        // Check title
        if (post.title?.toLowerCase().includes(searchLower)) {
          return true;
        }

        // Check tags
        if (
          post.tags?.some((tag) =>
            tag.name?.toLowerCase().includes(searchLower)
          )
        ) {
          return true;
        }

        // Check authors
        if (
          post.authors?.some(
            (author) =>
              typeof author === "string" &&
              author.toLowerCase().includes(searchLower)
          )
        ) {
          return true;
        }

        return false;
      });

      setFilteredNews(filtered);
    }
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [search, allNews]);

  // Handle pagination
  useEffect(() => {
    // Calculate total pages
    const total = Math.ceil(filteredNews.length / POSTS_PER_PAGE);
    setTotalPages(total || 1); // Ensure at least 1 page even if no results

    // Get current page's posts
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    setDisplayedNews(filteredNews.slice(startIndex, endIndex));

    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [filteredNews, currentPage]);

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No need for API call, the useEffect above will handle filtering
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];

    // Add previous page button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-primary-main text-white hover:bg-primary-dark"
        }`}
      >
        &laquo; Prev
      </button>
    );

    // Add page number buttons
    // Show first and last page always, and a few pages around current page
    const pagesToShow = [];
    pagesToShow.push(1); // Always show first page

    // Add pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pagesToShow.includes(i)) {
        pagesToShow.push(i);
      }
    }

    // Add last page if not already added
    if (totalPages > 1) {
      pagesToShow.push(totalPages);
    }

    // Sort page numbers and add ellipsis where needed
    pagesToShow.sort((a, b) => a - b);
    let prevPage = 0;

    for (const page of pagesToShow) {
      // Add ellipsis if pages are skipped
      if (page - prevPage > 1) {
        buttons.push(
          <span key={`ellipsis-${page}`} className="px-3 py-2">
            ...
          </span>
        );
      }

      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === page
              ? "bg-primary-main text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      );

      prevPage = page;
    }

    // Add next page button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-primary-main text-white hover:bg-primary-dark"
        }`}
      >
        Next &raquo;
      </button>
    );

    return buttons;
  };

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <ImageWithTextOverlay
          imgUrl="/assets/imgs/blog-cover.png"
          width={1920}
          height={300}
          text="News"
        />
      </div>
      <div className="container mx-auto">
        <div className="flex-col py-10">
          <div className="flex xs:flex-col space-x-4">
            {/* Blog list */}
            {renderLoading()}
            {/* Search articles */}
            <div className="flex flex-col space-y-5 px-4 xs:w-full md:w-full">
              {/* implement search articles */}
              <div className="flex flex-col space-y-10">
                <div>
                  {/* search input */}
                  <div className="flex items-center align-middle w-min-[270px] space-y-2  border-2 border-gray-300 rounded-lg  ">
                    <form className="w-full" onSubmit={handleSearch}>
                      <input
                        type="text"
                        placeholder="Search by title, author, or tag"
                        className="w-full outline-none border-none bg-transparent text-sm py-4 px-2"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </form>
                    <Image
                      className="cursor-pointer mr-2"
                      src="/assets/icons/search.svg"
                      alt="search logo"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full md:w-full px-5 flex-col">
              <div className="relative grid gap-[4vmin] py-[4vmin] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {displayedNews?.map((blog) => (
                  <React.Fragment key={blog.id || ""}>
                    <Card {...blog} />
                  </React.Fragment>
                ))}
              </div>

              {/* Pagination controls */}
              {filteredNews.length > 0 && (
                <div className="flex justify-center mt-8 mb-4">
                  <div className="flex flex-wrap justify-center">
                    {renderPaginationButtons()}
                  </div>
                </div>
              )}

              {/* No results message */}
              {filteredNews.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-lg text-gray-500">
                    No posts found matching your search criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
