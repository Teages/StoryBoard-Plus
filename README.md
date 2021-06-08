# StoryBoard-Plus
StoryBoard++ for Cytoid

## Functions

The Compile Order: 
1. [Tick as time](#tick-as-time)
2. [State Inheritance](#state-inheritance)
3. [Multi-state](#multi-state)
   
### Tick as time

Now you can use Tick as time

```jsonc
{
    "time": "tick:1920",
    //.....
}
```

### State Inheritance 
```jsonc
{
    //......
    "states": [
        {
            "time": 0,
            "x": 0
        },
        {
            "time": 5,
            "y": 0
        },
        {
            "time": 10,
            "x": 1
        },
        {
            "time": 15,
            "y": 1
        }
    ]
}
```

```jsonc
{
    //......
    "states": [
        {
            "time": 0,
            "x": 0
        },
        {
            "time": 5,
            "x": 0.5,
            "y": 0
        },
        {
            "time": 10,
            "x": 1,
            "y": 0.5
        },
        {
            "time": 15,
            "x": 1,
            "y": 1
        }
    ]
}
```

### Multi-state

```jsonc
{
    //......
    "states": [
        [
            {
                "easing": "linear",
                "time": 0,
                "x": 0
            },
            {
                "time": 10,
                "x": 1
            }
        ],
        [
            {
                "easing": "easeOutQuad",
                "time": 5,
                "y": 0
            },
            {
                "time": 15,
                "y": 1
            }
        ]
    ]
}
```
will translate to:
```jsonc
{
    //......
    "id": "d9d53f76", // random string
    "states": [
        {
            "easing": "linear",
            "time": 0,
            "x": 0
        },
        {
            "time": 10,
            "x": 1
        }
    ]
},
{
    //......
    "target_id": "d28sg2u", // Same with the main one
    "states": [
        {
            "easing": "easeOutQuad",
            "time": 5,
            "y": 0
        },
        {
            "time": 15,
            "y": 1
        }
    ]
}
```
