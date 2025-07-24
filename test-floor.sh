#!/bin/bash

# Test script to check if flooring gives classic typographic scale
echo "Testing if flooring gives classic typographic scale:"
echo "=================================================="

# Values from our rounded script
values=(6.0 7.0 8.0 9.0 10.5 12.0 14.0 16.0 18.0 21.0)

echo "Rounded values -> Floored values:"
for i in "${!values[@]}"; do
    floored=$(echo "scale=0; ${values[$i]}/1" | bc -l)
    echo "f($i) = ${values[$i]} -> $floored"
done

echo ""
echo "Classic typographic scale from article:"
echo "6, 7, 8, 9, 10, 12, 14, 16, 18, 21" 