import { SchemaObj } from 'convict';
import { schema } from '../src/config';

function parse(config) {
  const recursiveParse = (conf, acc: any[]) => {
    Object.values(conf).forEach((value: SchemaObj | { [k: string]: SchemaObj }) => {
      if (value.doc && value.default) {
        acc.push(value);
      } else {
        recursiveParse(value, acc);
      }
    });
  };

  const acc = [];

  recursiveParse(config, acc);
  return acc;
}

const flatSchema = parse(schema).filter((item) => item.env);

const rowsMd = flatSchema
  .map((item) => {
    const format = typeof item.format === 'function' ? item.format?.name ?? '' : Array.isArray(item.format) ? item.format.join(', ') : item.format;

    return `|${item.env}|${item.default}|${format}|${item.doc}|`;
  })
  .join('\n');

const md = `
|ENV variable|Default value|Format|Description|
|---|---|---|---|
${rowsMd}
`;

console.log(md);
