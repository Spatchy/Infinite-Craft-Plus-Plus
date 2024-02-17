chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.method === "GET" && details.url.startsWith("https://neal.fun/api/infinite-craft/pair")) {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "responseReceived", response: details })
            });
        }
    },
    { urls: ["https://neal.fun/api/infinite-craft/pair*"] },
    []
)