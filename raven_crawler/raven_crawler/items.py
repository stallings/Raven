import scrapy


class RavenCrawlerItem(scrapy.Item):
    name = scrapy.Field()
    price = scrapy.Field()
    sku = scrapy.Field()
