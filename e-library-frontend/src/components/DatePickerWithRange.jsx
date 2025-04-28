"use client";

import * as React from "react";
import { format, isBefore, isAfter } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
  disable_from = [],
  disable_until = [],
  setBorrowRequest = null,
  borrowRequest = null,
}) {
  const [date, setDate] = React.useState({
    from: null,
    to: null,
  });

  // Process disabled dates
  const processDisabledDates = () => {
    const disabledDates = [];

    // Always disable dates before tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to beginning of tomorrow

    // Add a range from distant past to yesterday to disable all past dates
    disabledDates.push({
      from: new Date(1900, 0, 1), // January 1, 1900
      to: new Date(today.setHours(23, 59, 59, 999)), // End of today
    });

    // Handle specific date ranges from disable_from to disable_until
    if (disable_from.length > 0 && disable_until.length > 0) {
      // Create disabled ranges by pairing each disable_from with each disable_until
      for (let i = 0; i < disable_from.length; i++) {
        const fromDate =
          typeof disable_from[i] === "string"
            ? new Date(disable_from[i])
            : disable_from[i];

        const toDate =
          typeof disable_until[i] === "string"
            ? new Date(disable_until[i])
            : disable_until[i];

        // Only add valid ranges (fromDate is before toDate)
        if (fromDate <= toDate) {
          disabledDates.push({ from: fromDate, to: toDate });
        }
      }
    }

    return disabledDates;
  };

  const disabledDateRanges = processDisabledDates();

  // Set default month to tomorrow instead of a fixed date
  const tomorrow = React.useMemo(() => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 1));
  }, []);

  // Check if a range overlaps with any disabled date range
  const isRangeOverlappingDisabledDates = (start, end) => {
    if (!start || !end) return false;

    // Check if any day in the range is within a disabled range
    for (const disabledRange of disabledDateRanges) {
      // Check if ranges overlap
      const rangesOverlap =
        // Case 1: Selected range starts before disabled range ends
        (isBefore(start, disabledRange.to) ||
          start.getTime() === disabledRange.to.getTime()) &&
        // Case 2: Selected range ends after disabled range starts
        (isAfter(end, disabledRange.from) ||
          end.getTime() === disabledRange.from.getTime());

      if (rangesOverlap) {
        return true;
      }
    }

    return false;
  };

  // Custom onSelect handler with validation
  const handleSelect = (selectedRange) => {
    // If only one date is selected (from date) or no dates selected, update state normally
    if (!selectedRange || !selectedRange.from || !selectedRange.to) {
      setDate(selectedRange);
      setBorrowRequest({
        ...borrowRequest,
        from: selectedRange.from,
        until: selectedRange.to,
      });
      return;
    }

    // Check if the selected range overlaps with any disabled dates
    if (isRangeOverlappingDisabledDates(selectedRange.from, selectedRange.to)) {
      // If there's an overlap, only update the "from" date
      setDate({ from: selectedRange.from, to: null });
      setBorrowRequest({
        ...borrowRequest,
        from: selectedRange.from,
        until: null,
      });
    } else {
      // If no overlap, update the full range
      setDate(selectedRange);
      setBorrowRequest({
        ...borrowRequest,
        from: selectedRange.from,
        until: selectedRange.to,
      });
    }
  };

  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "max-w-[500px] w-full h-12 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={tomorrow} // Start with tomorrow's month
            selected={date}
            onSelect={handleSelect} // Use custom handler instead of setDate directly
            numberOfMonths={2}
            disabled={disabledDateRanges}
            fromDate={tomorrow} // Alternative way to disable past dates
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
