import { useRef } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import "./input.css";
import { Spinner, TextField } from "@radix-ui/themes";
import { useSearch } from "../../hooks/useSearch";

interface CustomInputProps<T> {
  options: T[];
  selectedOption: T;
  onOptionChange: (option: T) => void;
  valueInput: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabledOptions?: T[];
  isLoading?: boolean;
  error?: string;
}

const CustomInput = <
  T extends { currency: string; symbol: string; price: number }
>({
  options,
  selectedOption,
  onOptionChange,
  valueInput,
  onValueChange,
  placeholder = "0.00",
  disabledOptions,
  isLoading = false,
  error,
}: CustomInputProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    searchTerm,
    searchRef,
    filteredOptions,
    handleSearchChange,
    clearSearch,
    hasResults,
  } = useSearch({
    options,
    searchKey: "currency" as keyof T,
  });

  const handleWrapperClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSelectOpenChange = (open: boolean) => {
    if (!open) clearSearch();
  };

  const handleSearchClick = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <>
      <div className="token-input-container">
        <div className="token-input-wrapper" onClick={handleWrapperClick}>
          <Select.Root
            value={selectedOption.currency}
            onValueChange={(currency) => {
              const token = options.find((t) => t.currency === currency);
              if (token) onOptionChange(token);
            }}
            onOpenChange={handleSelectOpenChange}
          >
            <Select.Trigger
              className="token-select-trigger"
              aria-label="Select token"
              onClick={(e) => e.stopPropagation()}
            >
              <Select.Value>
                <div className="token-display">
                  <img
                    src={selectedOption.symbol}
                    alt={selectedOption.currency}
                    className="token-image"
                  />
                  <span className="token-symbol">
                    {selectedOption.currency}
                  </span>
                  <ChevronDownIcon className="chevron-icon" />
                </div>
              </Select.Value>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                className="token-select-content"
                position="popper"
                sideOffset={10}
                onCloseAutoFocus={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
              >
                <div className="search-container">
                  <TextField.Root
                    variant="soft"
                    placeholder="Search tokens…"
                    ref={searchRef}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSearchClick();
                    }}
                    onFocus={(e) => {
                      e.stopPropagation();
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        if (
                          searchRef.current &&
                          document.activeElement !== searchRef.current
                        ) {
                          searchRef.current.focus();
                        }
                      }, 0);
                    }}
                  >
                    <TextField.Slot>
                      <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                  </TextField.Root>
                </div>
                <Select.Viewport className="token-select-viewport">
                  {hasResults ? (
                    filteredOptions.map((token) => (
                      <Select.Item
                        key={token.currency}
                        value={token.currency}
                        className="token-select-item"
                        disabled={disabledOptions?.includes(token)}
                        onSelect={() => {
                          clearSearch();
                        }}
                      >
                        <Select.ItemText>
                          <div className="token-item-content">
                            <img
                              src={token.symbol}
                              alt={token.currency}
                              className="token-image"
                            />
                            <div className="token-info">
                              <span className="token-symbol">
                                {token.currency}
                              </span>
                            </div>
                          </div>
                        </Select.ItemText>
                      </Select.Item>
                    ))
                  ) : (
                    <div className="no-results">
                      <span>No tokens found for "{searchTerm}"</span>
                    </div>
                  )}
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <div className="amount-input-container">
            <input
              ref={inputRef}
              type="number"
              value={valueInput}
              onChange={(e) => onValueChange(e.target.value)}
              onKeyDown={(e) => {
                // Prevent "e", "E", "+", "-" characters
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "+" ||
                  e.key === "-"
                ) {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                // Prevent pasting invalid characters
                const paste = e.clipboardData.getData("text");
                if (/[eE+-]/.test(paste)) {
                  e.preventDefault();
                }
              }}
              placeholder={placeholder}
              className="amount-input"
            />
            <div className="usd-value">
              {isLoading ? (
                <Spinner size="1" />
              ) : !isNaN(parseFloat(valueInput)) ? (
                <>
                  ~$
                  {(
                    parseFloat(valueInput || "0") * selectedOption.price
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  USD
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default CustomInput;
