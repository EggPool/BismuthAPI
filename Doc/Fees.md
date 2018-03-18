# Bismuth Fees

* TX without additional data: 0.01 BIS
* TX with data: 0.01BIS + len(openfield) / 100000
* Token issuance: +10 BIS
* Alias registration: +1 BIS

# Reference code

(Python)

```
def fee_calculate(openfield):
    fee = '%.8f' % float(0.01 + (float(len(openfield)) / 100000))  # 0.01 dust
    if "token:issue:" in openfield:
        fee = '%.8f' % (float(fee) + 10)
    if "alias=" in openfield:
        fee = '%.8f' % (float(fee) + 1)
    return fee
```
