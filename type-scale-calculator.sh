#!/bin/bash

# Type Scale Calculator
# Uses the formula: f(i) = f(0) * pow(ratio, i/n)
# Where: i = index, f(0) = first member, n = member count, ratio = scale ratio

# Function to calculate type scale values
calculate_type_scale() {
    local f0=$1    # First member (fundamental frequency)
    local ratio=$2 # Scale ratio
    local n=$3     # Number of members
    
    echo "Type Scale Calculator"
    echo "===================="
    echo "f(0) = $f0"
    echo "ratio = $ratio"
    echo "n = $n"
    echo ""
    echo "Values:"
    echo "------"
    
    for ((i=0; i<n; i++)); do
        # Calculate using the formula: f(i) = f(0) * pow(ratio, i/n)
        # Using bc for floating point arithmetic
        value=$(echo "scale=4; $f0 * e(l($ratio) * $i / $n)" | bc -l)
        echo "f($i) = $value"
    done
}

# Function to show usage
show_usage() {
    echo "Usage: $0 <f0> <ratio> <n>"
    echo ""
    echo "Parameters:"
    echo "  f0     - First member (fundamental frequency)"
    echo "  ratio  - Scale ratio"
    echo "  n      - Number of members in the scale"
    echo ""
    echo "Examples:"
    echo "  $0 1 2 5    # Classic typographic scale (1em, ratio=2, 5 members)"
    echo "  $0 12 2 5   # Print typography (12pt, ratio=2, 5 members)"
    echo "  $0 1 1.618 3 # Golden ratio scale (1em, ratio=φ, 3 members)"
}

# Check if we have the required arguments
if [ $# -ne 3 ]; then
    echo "Error: Expected 3 arguments, got $#"
    echo ""
    show_usage
    exit 1
fi

# Validate arguments are numbers
for arg in "$1" "$2" "$3"; do
    if ! [[ "$arg" =~ ^[0-9]+\.?[0-9]*$ ]]; then
        echo "Error: '$arg' is not a valid number"
        exit 1
    fi
done

# Check if bc is available
if ! command -v bc &> /dev/null; then
    echo "Error: 'bc' command is required for calculations"
    echo "Please install bc (usually available in most Unix-like systems)"
    exit 1
fi

# Calculate and display the type scale
calculate_type_scale "$1" "$2" "$3" 