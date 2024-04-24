export const JSON_schema = {
    "$schema": 'http://json-schema.org/draft-07/schema#',
    "title": "Generated schema for Root",
    "type": "array",
    "items": {
        "type": "object", "properties": {
            "id": {
                "type": "number"
            }, "title": {
                "type": "string"
            }, "price": {
                "type": "number"
            }, "description": {
                "type": "string"
            }, "category": {
                "type": "string"
            }, "image": {
                "type": "string"
            }, "rating": {
                "type": "object", "properties": {
                    "rate": {
                        "type": "number"
                    }, "count": {
                        "type": "number"
                    }
                }, "required": ["rate", "count"]
            }
        }, "required": ["id", "title", "price", "description", "category", "image", "rating"]
    }
}

export const xmlPayload = `        
        <Pet>
            <id>0</id>
            <Category>
                <id>0</id>
                <name>Dog</name>
            </Category>
            <name>Jimmy</name>
            <photoUrls>
                <photoUrl>string</photoUrl>
            </photoUrls>
            <tags>
                <Tag>
                    <id>0</id>
                    <name>string</name>
                </Tag>
            </tags>
            <status>available</status>
        </Pet>
`