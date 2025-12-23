def knapsack(items, capacity):
    """
    items: [
      { "id": int, "weight": int, "value": int }
    ]
    capacity: int
    """

    n = len(items)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        weight = items[i - 1]["weight"]
        value = items[i - 1]["value"]

        for w in range(capacity + 1):
            if weight <= w:
                dp[i][w] = max(
                    dp[i - 1][w],
                    dp[i - 1][w - weight] + value
                )
            else:
                dp[i][w] = dp[i - 1][w]

    # geri izleme (hangi itemlar seçildi)
    w = capacity
    selected_items = []

    for i in range(n, 0, -1):
        if dp[i][w] != dp[i - 1][w]:
            item = items[i - 1]
            selected_items.append(item)
            w -= item["weight"]

    return selected_items
