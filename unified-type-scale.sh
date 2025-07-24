#!/bin/bash

# Unified Type Scale Calculator
# Can switch between continuous formula and classic scale
# Uses the formula: f(i) = f(0) * pow(ratio, i/n) for continuous
# Uses discrete octaves for classic scale

# Function to calculate continuous type scale values
calculate_continuous_scale() {
    local f0=$1    # First member (fundamental frequency)
    local ratio=$2 # Scale ratio
    local n=$3     # Number of members
    local round_type=$4 # "none", "floor", "round", "0.5"
    
    echo "Continuous Type Scale Calculator"
    echo "==============================="
    echo "f(0) = $f0"
    echo "ratio = $ratio"
    echo "n = $n"
    echo "rounding = $round_type"
    echo ""
    echo "Values:"
    echo "------"
    
    for ((i=0; i<n; i++)); do
        # Calculate which octave we're in (same as classic scale)
        local octave=$((i / 5))
        local position_in_octave=$((i % 5))
        
        # Calculate the starting value for this octave
        local octave_start=$(echo "scale=4; $f0 * 2^$octave" | bc -l)
        
        # Calculate using the formula: f(i) = f(0) * pow(ratio, i/n) within the octave
        value=$(echo "scale=4; $octave_start * e(l($ratio) * $position_in_octave / 5)" | bc -l)
        
        # Apply rounding based on type
        case $round_type in
            "floor")
                value=$(echo "scale=0; $value / 1" | bc -l)
                ;;
            "round")
                value=$(echo "scale=0; ($value + 0.5) / 1" | bc -l)
                ;;
            "0.5")
                # Round to nearest 0.5
                value=$(echo "scale=0; ($value * 2 + 0.5) / 1" | bc -l)
                value=$(echo "scale=1; $value / 2" | bc -l)
                ;;
            *)
                # No rounding, keep 4 decimal places
                value=$(echo "scale=4; $value" | bc -l)
                ;;
        esac
        
        echo "f($i) = $value"
    done
}

# Function to calculate classic typographic scale values
calculate_classic_scale() {
    local f0=$1    # First member (fundamental frequency)
    local n=$2     # Number of members
    local round_type=$3 # "none", "floor", "round", "0.5"
    
    echo "Classic Typographic Scale Calculator"
    echo "==================================="
    echo "f(0) = $f0"
    echo "n = $n"
    echo "rounding = $round_type"
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
        case $position_in_octave in
            0) value=$octave_start ;;
            1) value=$(echo "scale=4; $octave_start * 7 / 6" | bc -l) ;;    # 7/6
            2) value=$(echo "scale=4; $octave_start * 4 / 3" | bc -l) ;;    # 4/3
            3) value=$(echo "scale=4; $octave_start * 3 / 2" | bc -l) ;;    # 3/2
            4) value=$(echo "scale=4; $octave_start * 7 / 4" | bc -l) ;;    # 7/4
        esac
        
        # Apply rounding based on type
        case $round_type in
            "floor")
                value=$(echo "scale=0; $value / 1" | bc -l)
                ;;
            "round")
                value=$(echo "scale=0; ($value + 0.5) / 1" | bc -l)
                ;;
            "0.5")
                # Round to nearest 0.5
                value=$(echo "scale=0; ($value * 2 + 0.5) / 1" | bc -l)
                value=$(echo "scale=1; $value / 2" | bc -l)
                ;;
            *)
                # No rounding, keep 4 decimal places
                value=$(echo "scale=4; $value" | bc -l)
                ;;
        esac
        
        echo "f($i) = $value"
    done
}

# Function to show usage
show_usage() {
    echo "Usage: $0 <mode> <f0> <ratio> <n> [rounding]"
    echo ""
    echo "Parameters:"
    echo "  mode     - 'continuous' or 'classic'"
    echo "  f0       - First member (fundamental frequency)"
    echo "  ratio    - Scale ratio (for continuous mode only)"
    echo "  n        - Number of members"
    echo "  rounding - 'none', 'floor', 'round', '0.5' (default: '0.5')"
    echo ""
    echo "Examples:"
    echo "  $0 continuous 6 2 5 round    # Continuous with round to integer"
    echo "  $0 classic 6 5 floor          # Classic with floor"
    echo "  $0 continuous 1 2 5           # Continuous with 0.5 rounding"
    echo ""
    echo "Note: Classic mode ignores the ratio parameter."
}

# Check if we have the required arguments
if [ $# -lt 3 ]; then
    echo "Error: Expected at least 3 arguments, got $#"
    echo ""
    show_usage
    exit 1
fi

mode=$1
f0=$2

if [[ "$mode" == "continuous" ]]; then
    if [ $# -lt 4 ]; then
        echo "Error: Continuous mode requires at least 4 arguments"
        echo ""
        show_usage
        exit 1
    fi
    ratio=$3
    n=$4
    round_type=${5:-"0.5"}
else
    # Classic mode
    n=$3
    round_type=${4:-"0.5"}
fi

# Validate mode
if [[ "$mode" != "continuous" && "$mode" != "classic" ]]; then
    echo "Error: Mode must be 'continuous' or 'classic'"
    exit 1
fi

# Validate numeric arguments
if ! [[ "$f0" =~ ^[0-9]+\.?[0-9]*$ ]]; then
    echo "Error: 'f0' is not a valid number"
    exit 1
fi
if ! [[ "$n" =~ ^[0-9]+\.?[0-9]*$ ]]; then
    echo "Error: 'n' is not a valid number"
    exit 1
fi
if [[ "$mode" == "continuous" ]]; then
    if ! [[ "$ratio" =~ ^[0-9]+\.?[0-9]*$ ]]; then
        echo "Error: 'ratio' is not a valid number"
        exit 1
    fi
fi

# Validate rounding type
if [[ "$round_type" != "none" && "$round_type" != "floor" && "$round_type" != "round" && "$round_type" != "0.5" ]]; then
    echo "Error: Rounding type must be 'none', 'floor', 'round', or '0.5'"
    exit 1
fi

# Check if bc is available
if ! command -v bc &> /dev/null; then
    echo "Error: 'bc' command is required for calculations"
    echo "Please install bc (usually available in most Unix-like systems)"
    exit 1
fi

# Calculate and display the type scale
if [[ "$mode" == "continuous" ]]; then
    calculate_continuous_scale "$f0" "$ratio" "$n" "$round_type"
else
    calculate_classic_scale "$f0" "$n" "$round_type"
fi 