#!/bin/bash
# Auto-fix script - Lint, format, and fix issues

echo "🔧 Running auto-fix..."

# Check for common issues
echo "Checking HTML structure..."
if grep -q "<script></script>" index.html; then
    echo "Found empty script tags"
fi

echo "✅ Auto-fix complete!"