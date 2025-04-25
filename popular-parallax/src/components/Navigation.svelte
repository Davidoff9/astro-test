<script>
  import { cn } from "../lib/utils";
  import { onMount } from "svelte";

  let currentPath = "";
  let activeDropdown = null;

  // Toggle dropdown menu
  function toggleDropdown(event, index) {
    event.preventDefault();
    activeDropdown = activeDropdown === index ? null : index;
  }

  // Navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ];

  // Only access the window object after the component is mounted (client-side)
  onMount(() => {
    currentPath = window.location.pathname;

    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      isDarkMode = true;
    }

    // Add event listener to close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-dropdown")) {
        activeDropdown = null;
      }
    });
  });

  // Helper function to check if a nav item is active
  function isActive(href) {
    if (!currentPath) return false;
    if (href === "/") return currentPath === href;
    return currentPath.startsWith(href);
  }
</script>

<header
  class="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md"
>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <!-- Navigation items for desktop - Now using a single inline flex container -->
      <nav class="hidden md:flex items-center space-x-6">
        {#each navItems as item, index}
          {#if item.dropdown}
            <div class="relative nav-dropdown">
              <button
                class={cn(
                  "group flex items-center px-2 py-1 rounded-full transition-all duration-200",
                  isActive(item.href)
                    ? "text-primary font-medium"
                    : "text-foreground/70 hover:text-primary"
                )}
                on:click={(e) => toggleDropdown(e, index)}
              >
                <span>{item.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class={cn(
                    "ml-1 h-4 w-4 transition-transform duration-200",
                    activeDropdown === index ? "rotate-180" : ""
                  )}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>

                <!-- Animated underline effect -->
                <span
                  class={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left",
                    isActive(item.href) && "scale-x-100"
                  )}
                ></span>
              </button>

              {#if activeDropdown === index}
                <div
                  class="absolute left-0 top-full mt-2 w-56 rounded-xl bg-card shadow-lg ring-1 ring-black/5 overflow-hidden z-50 backdrop-blur-sm"
                >
                  <div class="py-2">
                    {#each item.dropdown as subItem}
                      <a
                        href={subItem.href}
                        class="group relative flex px-4 py-2 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <span>{subItem.label}</span>
                      </a>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          {:else}
            <a
              href={item.href}
              class={cn(
                "group relative px-2 py-1 rounded-full transition-all duration-200",
                isActive(item.href)
                  ? "text-primary font-medium"
                  : "text-foreground/70 hover:text-primary"
              )}
            >
              <span>{item.label}</span>

              <span
                class={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left",
                  isActive(item.href) && "scale-x-100"
                )}
              ></span>
            </a>
          {/if}
        {/each}
      </nav>
      <div class="flex items-center space-x-4">
        <a
          href="/contact"
          class="hidden md:flex items-center bg-gradient-to-r from-primary/80 to-primary rounded-full px-4 py-1.5 text-sm text-primary-foreground font-medium shadow-sm hover:shadow-md transition-all"
        >
          Get in Touch
        </a>
      </div>
    </div>
  </div>
</header>

<style>
  /* Add a custom spring animation for the toggle switch */
  .ease-spring-3 {
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  }
</style>
