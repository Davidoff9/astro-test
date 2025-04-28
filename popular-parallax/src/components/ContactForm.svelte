<script>
  import { cn } from "../lib/utils";

  let name = "";
  let email = "";
  let message = "";
  let submitted = false;
  let isLoading = false;

  async function handleSubmit() {
    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }
    isLoading = true;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error();
      name = "";
      email = "";
      message = "";
      submitted = true;
      setTimeout(() => (submitted = false), 3000);
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="p-6">
  <div class="space-y-2 pb-4">
    <h3 class="text-2xl font-semibold">Send us a message</h3>
    <p class="text-sm text-muted-foreground">
      Fill out the form below and we'll get back to you as soon as possible.
    </p>
  </div>

  {#if submitted}
    <div class="mb-6 rounded-md bg-primary/10 p-4 text-primary">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium">
            Thank you for your message! We'll get back to you soon.
          </p>
        </div>
      </div>
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div class="space-y-2">
      <label
        for="name"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >Name</label
      >
      <input
        type="text"
        id="name"
        bind:value={name}
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Your name"
      />
    </div>

    <div class="space-y-2">
      <label
        for="email"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >Email</label
      >
      <input
        type="email"
        id="email"
        bind:value={email}
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="you@example.com"
      />
    </div>

    <div class="space-y-2">
      <label
        for="message"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >Message</label
      >
      <textarea
        id="message"
        bind:value={message}
        rows="4"
        class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Your message"
      ></textarea>
    </div>

    <button
      type="submit"
      disabled={isLoading}
      class={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isLoading && "opacity-70 cursor-not-allowed"
      )}
    >
      {#if isLoading}
        <svg
          class="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
        Sending...
      {:else}
        Send Message
      {/if}
    </button>
  </form>
</div>
