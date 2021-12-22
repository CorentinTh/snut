import * as shell from 'shelljs';

const distDir = 'dist';

shell.cp('-R', 'src/views', distDir);
shell.cp('-R', 'src/public', distDir);
