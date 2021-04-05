# StoryBoard-Plus
StoryBoard++ for Cytoid

## Functions

### Tick to time

Now you can use Tick as time

```jsonc
{
    "time": "tick: 1920",
    //.....
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
```
{
    //......
    "id": "d9d53f76", // firts 8 char of hash the orginal json "{xxx}"
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

### State Inheritance 
```
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

```
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
