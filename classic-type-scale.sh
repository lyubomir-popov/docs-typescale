#!/bin/bash

# Classic Typographic Scale Calculator
# Implements the classic typographic scale with discrete octaves
# Each octave has 5 elements and doubles the starting value

# Function to calculate classic typographic scale values
calculate_classic_scale() {
    local f0=$1    # First member (fundamental frequency)
    local n=$2     # Number of members
    
    echo "Classic Typographic Scale Calculator"
    echo "==================================="
    echo "f(0) = $f0"
    echo "n = $n"
    echo ""
    echo "Values:"
    echo "------"
    
    for ((i=0; i<n; i++)); do
        # Calculate which octave we're in
        local octave=$((i / 5))
        local position_in_octave=$((i % 5))
        
        # Calculate the starting value for this octave
        local octave_start=$(echo "scale=4; $f0 * 2^$octave" | bc -l)
        
        # Calculate the value within the octave
        # The classic scale uses specific ratios within each octave
        case $position_in_octave in
            0) value=$octave_start ;;
            1) value=$(echo "scale=4; $octave_start * 7 / 6" | bc -l) ;;    # 7/6
            2) value=$(echo "scale=4; $octave_start * 4 / 3" | bc -l) ;;    # 4/3
            3) value=$(echo "scale=4; $octave_start * 3 / 2" | bc -l) ;;    # 3/2
            4) value=$(echo "scale=4; $octave_start * 7 / 4" | bc -l) ;;    # 7/4
        esac
        
        # Round to nearest 0.5 using a simpler approach
        # Multiply by 2, round to nearest integer, then divide by 2
        value=$(echo "scale=0; ($value * 2 + 0.5) / 1" | bc -l)
        value=$(echo "scale=1; $value / 2" | bc -l)
        
        echo "f($i) = $value"
    done
}

# Function to show usage
show_usage() {
    echo "Usage: $0 <f0> <n>"
    echo ""
    echo "Parameters:"
    echo "  f0     - First member (fundamental frequency)"
    echo "  n      - Number of members in the scale"
    echo ""
    echo "Examples:"
    echo "  $0 6 10    # Classic scale starting from 6, 10 members"
    echo "  $0 12 15   # Print typography starting from 12pt, 15 members"
    echo ""
    echo "Note: This implements the classic typographic scale with discrete octaves"
    echo "where each octave of 5 elements doubles the starting value."
}

# Check if we have the required arguments
if [ $# -ne 2 ]; then
    echo "Error: Expected 2 arguments, got $#"
    echo ""
    show_usage
    exit 1
fi

# Validate arguments are numbers
for arg in "$1" "$2"; do
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

# Calculate and display the classic typographic scale
calculate_classic_scale "$1" "$2" 