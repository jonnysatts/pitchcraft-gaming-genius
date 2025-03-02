import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import Button, { buttonVariants } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number
  totalCount: number
  pageSize: number
  siblingCount?: number
  className?: string
  onPageChange: (page: number) => void
}

const DOTS = "DOTS"

function range(start: number, end: number) {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

function usePagination({
  totalCount,
  pageSize,
  siblingCount = 1,
  page,
  onPageChange,
}: PaginationProps) {
  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalNumbers = siblingCount * 2 + 3
    
    if (totalNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      page + siblingCount,
      totalPageCount
    )

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftRange = range(1, 3 + 2 * siblingCount)
      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightRange = range(
        totalPageCount - 2 - 2 * siblingCount,
        totalPageCount
      )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, page])

  return paginationRange
}

export const Pagination = ({
  page,
  totalCount,
  pageSize,
  siblingCount,
  className,
  onPageChange,
  ...props
}: PaginationProps) => {
  const paginationRange = usePagination({
    page,
    totalCount,
    pageSize,
    siblingCount,
    onPageChange,
  })

  if (page === 0 || paginationRange?.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(page + 1)
  }

  const onPrevious = () => {
    onPageChange(page - 1)
  }

  let lastPage = paginationRange?.[paginationRange?.length - 1]

  return (
    <div
      className={cn("flex w-full items-center justify-between", className)}
      {...props}
    >
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={onPrevious}
        disabled={page === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Go to previous page</span>
      </Button>
      <ul className="flex items-center gap-1">
        {paginationRange?.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <li key={i}>
                <div className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More pages</span>
                </div>
              </li>
            )
          }

          return (
            <li key={i}>
              <Button
                variant="outline"
                className={cn(
                  "h-8 w-8 p-0",
                  pageNumber === page
                    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                    : "bg-transparent hover:bg-secondary hover:text-muted-foreground"
                )}
                onClick={() => onPageChange(Number(pageNumber))}
              >
                {pageNumber}
                {pageNumber === page ? (
                  <span className="sr-only">
                    (current)
                  </span>
                ) : null}
              </Button>
            </li>
          )
        })}
      </ul>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={onNext}
        disabled={page === lastPage || lastPage === undefined}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Go to next page</span>
      </Button>
    </div>
  )
}
